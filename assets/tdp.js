// Download buttons for the plugin pages.
//
// Reads the public repository's GitHub releases in the browser and offers the
// newest release that contains the plugin, so the site never needs rebuilding
// after a release.
//
// Markup it fills in:
//   <div class="tdp-download" data-plugin="LifeGameCHOP"></div>   one plugin
//   <div class="tdp-download" data-plugin="*"></div>              all-in-one zip
//   <div class="tdp-download-table"></div>                        every plugin
(function () {
  "use strict";

  var REPO = "Shinh0707/TouchDesignerShareDatas";
  var CACHE_KEY = "tdp-releases-v1";
  var CACHE_MS = 10 * 60 * 1000;
  var RELEASES_PAGE = "https://github.com/" + REPO + "/releases";

  function userOS() {
    var ua = navigator.userAgent || "";
    if (/Windows/i.test(ua)) return "windows";
    if (/Macintosh|Mac OS X/i.test(ua)) return "mac";
    return "";
  }

  function fetchReleases() {
    try {
      var cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (cached && Date.now() - cached.at < CACHE_MS) return Promise.resolve(cached.data);
    } catch (e) { /* storage unavailable */ }
    return fetch("https://api.github.com/repos/" + REPO + "/releases?per_page=100", {
      headers: { Accept: "application/vnd.github+json" }
    }).then(function (r) {
      if (!r.ok) throw new Error("GitHub API " + r.status);
      return r.json();
    }).then(function (data) {
      var slim = data.filter(function (r) { return !r.draft; }).map(function (r) {
        return {
          tag: r.tag_name, url: r.html_url, date: r.published_at, prerelease: r.prerelease,
          assets: r.assets.map(function (a) { return { name: a.name, url: a.browser_download_url, size: a.size }; })
        };
      });
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: slim })); } catch (e) { }
      return slim;
    });
  }

  // Every release that contains <plugin>-<version>-<os>.zip ("*" = TDPlugins bundle).
  function versionsOf(plugin, releases) {
    var prefix = plugin === "*" ? "TDPlugins" : plugin;
    var re = new RegExp("^" + prefix + "-(.+)-(mac|windows)\\.zip$");
    var out = [];
    releases.forEach(function (r) {
      var files = {};
      var version = null;
      r.assets.forEach(function (a) {
        var m = a.name.match(re);
        if (m) { version = m[1]; files[m[2]] = a; }
      });
      if (version && !r.prerelease) {
        out.push({ version: version, date: r.date, url: r.url, files: files });
      }
    });
    out.sort(function (a, b) { return Date.parse(b.date) - Date.parse(a.date); });
    return out;
  }

  function pick(versions) {
    return versions.length ? versions[0] : null; // newest first
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  }

  function buttons(v, primary) {
    var row = el("div", "tdp-buttons");
    var os = userOS();
    [["mac", "Mac"], ["windows", "Windows"]].forEach(function (p) {
      var a = v.files[p[0]];
      if (!a) {
        row.appendChild(el("span", "tdp-btn tdp-btn--none", p[1] + " 版なし"));
        return;
      }
      var b = el("a", "tdp-btn" + (primary && p[0] === os ? " tdp-btn--mine" : ""),
                 p[1] + " 版をダウンロード");
      b.href = a.url;
      b.title = a.name + " (" + Math.max(1, Math.round(a.size / 1024)) + " KB)";
      row.appendChild(b);
    });
    return row;
  }

  function renderOne(box, versions) {
    box.innerHTML = "";
    var v = pick(versions);
    if (!v) {
      box.appendChild(el("p", "tdp-note", "まだ公開されたリリースはありません。"));
      return;
    }
    var card = el("div", "tdp-card");
    card.appendChild(el("div", "tdp-card__title", "最新版 v" + v.version + "(" + fmtDate(v.date) + " 公開)"));
    card.appendChild(buttons(v, true));
    box.appendChild(card);
    var more = el("a", "tdp-more", "過去のバージョン");
    more.href = RELEASES_PAGE + "?q=" + encodeURIComponent(box.dataset.plugin === "*" ? "TouchDesigner Plugins" : box.dataset.plugin);
    box.appendChild(more);
  }

  function renderTable(box, releases, plugins) {
    var t = el("table");
    t.innerHTML = "<thead><tr><th>プラグイン</th><th>最新版</th><th>Mac</th><th>Windows</th></tr></thead>";
    var tb = el("tbody");
    plugins.forEach(function (name) {
      var v = pick(versionsOf(name, releases));
      var tr = el("tr");
      var a = el("a", null, name);
      a.href = "../plugins/" + name + "/";
      var td = el("td"); td.appendChild(a); tr.appendChild(td);
      tr.appendChild(el("td", null, v ? "v" + v.version : "—"));
      ["mac", "windows"].forEach(function (os) {
        var cell = el("td");
        if (v && v.files[os]) {
          var link = el("a", null, "ダウンロード");
          link.href = v.files[os].url;
          cell.appendChild(link);
        } else {
          cell.textContent = "—";
        }
        tr.appendChild(cell);
      });
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    box.innerHTML = "";
    box.appendChild(t);
  }

  function fail(box, err) {
    box.innerHTML = "";
    var p = el("p", "tdp-note", "リリース情報を読み込めませんでした(" + err.message + ")。 ");
    var a = el("a", null, "リリース一覧を開く");
    a.href = RELEASES_PAGE;
    p.appendChild(a);
    box.appendChild(p);
  }

  function init() {
    var boxes = document.querySelectorAll(".tdp-download, .tdp-download-table");
    if (!boxes.length) return;
    boxes.forEach(function (b) { b.textContent = "読み込み中…"; });
    fetchReleases().then(function (releases) {
      boxes.forEach(function (b) {
        if (b.classList.contains("tdp-download-table")) {
          renderTable(b, releases, (b.dataset.plugins || "").split(",").filter(Boolean));
        } else {
          renderOne(b, versionsOf(b.dataset.plugin, releases));
        }
      });
    }).catch(function (err) { boxes.forEach(function (b) { fail(b, err); }); });
  }

  if (window.document$ && window.document$.subscribe) {
    window.document$.subscribe(init); // Material for MkDocs (instant navigation)
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

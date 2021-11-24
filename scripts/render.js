const { encodeURL, url_for } = require('hexo-util');

hexo.extend.filter.register('marked:renderer', function (renderer) {
    const { config } = this; // Skip this line if you don't need user config from _config.yml
    renderer.image = function (href, title, text) {
        const { hexo, options } = this;
        const { relative_link } = hexo.config;
        const { lazyload, prependRoot, postPath } = options;
        let { baseUrl = '' } = options;

        if (!/^(#|\/\/|http(s)?:)/.test(href) && !relative_link && prependRoot) {
            if (!href.startsWith('/') && !href.startsWith('\\') && postPath) {
                const PostAsset = hexo.model('PostAsset');
                // findById requires forward slash
                const asset = PostAsset.findById(join(postPath, href.replace(/\\/g, '/')));
                // asset.path is backward slash in Windows
                if (asset) href = asset.path.replace(/\\/g, '/');
            }
            href = url_for.call(hexo, href);
        }

        if (!/^(#|\/\/|http(s)?:)/.test(href)) {
            baseUrl = baseUrl.replace(/\\/g, '/');
            if (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.slice(0, baseUrl.length - 1);
            }
            if (!href.startsWith('/')) {
                href = '/' + href;
            }
            href = baseUrl + href;
        }

        let out = `<img src="${encodeURL(href)}"`;
        if (text) out += ` alt="${text}"`;
        if (title) out += ` title="${title}"`;
        if (lazyload) out += ' loading="lazy"';

        out += '>';
        return out;
    }
})
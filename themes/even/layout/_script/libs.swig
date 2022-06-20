{%- if theme.fancybox -%}
  {%- set fancybox_js = 'fancybox/jquery.fancybox.pack.js' -%}
{%- endif -%}

{%-
  set js_libs = {
    jquery: 'jquery/jquery.min.js',
    slideout: 'slideout/slideout.js',
    fancybox: fancybox_js,
    nprogress: nprogress_js,
  }
-%}

{%- for lib in js_libs -%}
  {%- if lib -%}
    <script type="text/javascript" src="{{ config.marked.baseUrl }}{{ url_for('lib') }}/{{ lib }}"></script>
  {%- endif -%}
{%- endfor -%}

<!-- 代码块复制功能 -->
<script type="text/javascript" src="{{ config.marked.baseUrl }}{{ url_for('js/src') }}/clipboard.min.js"></script>
<script type="text/javascript" src="{{ config.marked.baseUrl }}{{ url_for('js/src') }}/clipboard-use.js"></script>

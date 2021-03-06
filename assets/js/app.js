//= require vendor/zepto
//= require_self
//= require_tree ./initializers

window.App = {
  initialize: function (opts) {
    var app = this;
    $.each(opts, function (el, fn) {
      var $el = $(el);
      if ($el.length > 0 && app[fn]) app[fn]($el);
    });
  },
  post: function (url, data, cb, err) {
    $.ajax({
      type: 'POST',
      url: url,
      data: $.extend(data, { '_csrf': App.csrf_token }),
      cache: false,
      headers: { 'X_CSRF_TOKEN': App.csrf_token },
      success: cb,
      error: err
    });
  },
  urlFor: function(path) {
    if (path.startsWith('/')) { path = path.substring(1) }
    return App.root_path + path;
  }
};

$(function () {
  App.csrf_token = $('meta[name="_csrf"]').attr('content');
  App.root_path = $('meta[name="_root_path"]').attr('content');

  App.initialize({
    '.googleauth.authorize': 'googleauthAuthorize',
    '.googleauth.success': 'googleauthSuccess',
    '.file-browser': 'gdriveList',
    '.content-submission': 'contentSubmission'
  });
});

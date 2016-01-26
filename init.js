/*
 * Copyright (c) Codiad & Andr3as, distributed
 * as-is and without warranty under the MIT License.
 * See http://opensource.org/licenses/MIT for more information. 
 * This information must remain intact.
 */

(function(global, $){
    
    var codiad = global.codiad,
        scripts = document.getElementsByTagName('script'),
        path = scripts[scripts.length-1].src.split('?')[0],
        curpath = path.split('/').slice(0, -1).join('/')+'/';

    $(function() {
        codiad.Runjs.init();
    });

    codiad.Runjs = {
        
        path: curpath,
        
        init: function() {
            amplify.subscribe('context-menu.onShow', function(obj){
                if (/\.js$/.test(obj.path)) {
                    $('#context-menu').append('<hr class="file-only runjs">');
                    $('#context-menu').append('<a class="file-only runjs" onclick="codiad.Runjs.contextMenu($(\'#context-menu\').attr(\'data-path\'));"><span class="icon-play"></span>RunJS</a>');
                }
            });
            amplify.subscribe('context-menu.onHide', function(){
                $('.runjs').remove();
            });
        },
        
        contextMenu: function(path) {
            $.getScript(this.path + 'controller.php?action=getScript&path=' + path, function(script, textStatus){
                if (textStatus == "success") {
                    codiad.message.success("Script executed");
                }
            });
        }
    };
})(this, jQuery);
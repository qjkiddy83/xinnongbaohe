let $ = require('jquery');
$(document).on('click', 'h2 .ico-setting', function() {
    var html = `<div class="layer">
				    <div class="layer-container">
				        <a href="javascript:;" class="icons ico-close gray"></a>
				        <h3>页面管理</h3>
				        <div class="layer-wrapper">
				            <input type="text" name="" placeholder="页面名称" />
				            <div class="controls">
				                <a href="#" class="button primary">更新</a>
				                <a href="#" class="button">取消</a>
				            </div>
				        </div>
				    </div>
				</div>`
    $('body').append(html);
})

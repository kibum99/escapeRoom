	// 마우스 호버 이벤트 구역
	var _mh = [];
	
	// 블러 커버
	_mh.bulrCover = document.getElementById('blur-cover');
	_mh.bigArea = document.getElementById('first');
	_mh.bg = document.getElementsByClassName('bg').item(0);
	
	_mh.mouse = function(e) {

		var scrollY = document.documentElement.scrollTop;
		var screenX = (window.innerWidth / 2)-scrollX;
		var screenY = (window.innerHeight / 2) - scrollY;
		var x = e.clientX - screenX-1050;
		var y = e.clientY - screenY-1620;

		if( this == _mh.bigArea ) {
			_mh.bg.style.opacity = ('1');
		}
    _mh.bulrCover.style.backgroundPosition = ''+x+'px '+y+'px';
	}
	
	_mh.mouseOut = function(e) {
		_mh.bg.style.opacity = ('0');

	}
	
	_mh.bigArea.addEventListener('mousemove',_mh.mouse);
	_mh.bigArea.addEventListener('mouseout',_mh.mouseOut);

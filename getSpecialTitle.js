var view = className("android.widget.AbsListView");
var output = [{
	nick: null
}];
get();
while (true) {
	if (view.scrollForward()) {
		sleep(1000);
		get();
	} else {
		toast("output");
		break;
	}
}
output.shift();
var i = 0;
for (var i = 0; i < output.length; i++) {
	for (var j = 1; i + j < output.length; j++) {
		if (output[i].nick == output[i + j].nick) {
			output.splice(i + j, 1);
			break;
		}
	}
}
files.write("/sdcard/qq.txt", JSON.stringify(output));
toast("done") function get() {
	var name = id("tv_name").find();
	name.forEach(function(e) {
		var group = e.parent().child(2);
		output.push({
			nick: e.text(),
			title: group.text()
		});
	});
}

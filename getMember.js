var iframe = document.createElement("iframe");
iframe.src = "https://moonyoulove.github.io/get_qun_member/";
iframe.style = "position: fixed;left: 35%;top: 20%;width: 250px;height: 350px;background:white;";
document.body.appendChild(iframe);
iframe.onload = function() {
	var bkn = parent.$.getCSRFToken();
	var gc = parent.document.URL.split("#gid=")[1];
	var qun_url = "https://qun.qq.com/cgi-bin/qun_mgr/search_group_members?st=0&end=1000";
	var xhr = new XMLHttpRequest();
	xhr.open("get", `${qun_url}&bkn=${bkn}&gc=${gc}`, true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			group = JSON.parse(xhr.responseText);
			iframe.contentWindow.postMessage(group, "https://moonyoulove.github.io");
		}
	}
}

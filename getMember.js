		var group = {};
		var pt = {};
		var logo_left_count = 0;
		var logo_url = "https://ptlogin2.qq.com/getface?&imgtype=4&uin=";
		var script = {};
		var dialog = document.createElement("div");
		dialog.innerHTML = '<input type="checkbox"id="cbox_convert"> 轉換頭像網址<br><input type="checkbox"id="cbox_addTitle"> 加入專屬頭銜<br><br><textarea name="TextEdit1"title=""cols="19"rows="8"id="textarea"></textarea><br><br><input name="Button1"type="button"value="獲取成員"title=""disabled="disabled"id="button">';
		dialog.style = "position: fixed;left: 35%;top: 20%;width: 250px;height: 300px;background:white;font-size:14px;text-align:center;border:solid 2px;color:black;padding-top:5px;border-radius:3%";
		document.body.appendChild(dialog);
		var cbox_convert = document.getElementById("cbox_convert");
		var cbox_addTitle = document.getElementById("cbox_addTitle");
		var textarea = document.getElementById("textarea");
		var button = document.getElementById("button");
		var bkn = parent.$.getCSRFToken();
		var gc = parent.document.URL.split("#gid=")[1];
		var qun_url = "https://qun.qq.com/cgi-bin/qun_mgr/search_group_members?st=0&end=1000";
		var xhr = new XMLHttpRequest();
		xhr.open("get", `${qun_url}&bkn=${bkn}&gc=${gc}`, true);
		xhr.send();
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4 && xhr.status == 200) {
		        group = JSON.parse(xhr.responseText);
		        button.disabled = false;
		    }
		}

		cbox_addTitle.onclick = function() {
		    if (cbox_addTitle.checked) {
		        textarea.defaultValue = '[{nick:"muli",title:"編程組"}]';
		    } else {
		        textarea.defaultValue = "";
		    }
		}
		button.onclick = function() {
		    if (cbox_addTitle.checked) addSpecialTitle();
		    if (cbox_convert.checked) {
		        convertLogoUrl();
		    } else {
		        textarea.value = JSON.stringify(group.mems);
		    }
		}

		pt.setHeader = function(url_data) {
		    script.remove();
		    group.mems[logo_left_count].logo = url_data[group.mems[logo_left_count].uin];
		    if (logo_left_count > 0) {
		        logo_left_count--;
		        textarea.value = `剩餘${logo_left_count}個頭像`;
		        script = document.createElement("script");
		        script.src = logo_url + group.mems[logo_left_count].uin;
		        document.body.appendChild(script);
		    } else {
		        textarea.value = JSON.stringify(group.mems);
		    }
		}

		function addSpecialTitle() {
		    group.mems.sort(function(a, b) {
		        return a.join_time - b.join_time
		    });
		    if (textarea.value == "") {
		        alert("請貼上數據!!");
		        return;
		    }
		    var st = JSON.parse(textarea.value);
		    var l = group.mems.length;
		    while (l--) {
		        group.mems[l].title = st[l].title;
		    }
		}

		function convertLogoUrl() {
		    logo_left_count = group.mems.length - 1;
		    textarea.value = `剩餘${logo_left_count}個頭像`;
		    script = document.createElement("script");
		    script.src = logo_url + group.mems[logo_left_count].uin;
		    document.body.appendChild(script);
		}

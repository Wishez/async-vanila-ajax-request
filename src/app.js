import '../styles/index.scss';
import '../tests';

function ajax({
	method,
	url,
	track
}) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		const start = Date.now();

		request.onreadystatechange = function (xhr) {
			const {
				target
			} = xhr;
			const {
				readyState,
				status
			} = target;


			const isRequestDone = readyState === 4;
			const isStatusOk = status === 200;
			const isNotFound = status === 404;
			const delta = Date.now() - start;


			if (isRequestDone && isStatusOk) {
				resolve({
					data: target.responseText,
				});
			} else {
				const statusHtml = `<p>
                    Make ${readyState} for ${delta}ms.
                </p>`;

				addTo(track, statusHtml)
			}

			if (isNotFound) {
				reject('Not found 404');
			}
		};

		request.open(method, url, true);
		request.send();
	});
}

if (isDocumentReady(document.readyState)) {
	console.log('Document is ready.');
	makeAjaxForArticlesData();
} else {
	document.addEventListener("DOMContentLoaded", makeAjaxForArticlesData);
}

function isDocumentReady(state) {
	return state === 'complete' || state === 'interactive';
}

function makeAjaxForArticlesData() {
	const track = document.getElementById('track');
	const api = 'https://filipp-zhuravlev.ru/api/v1/'
	const method = "GET";
	const url = `${api}article/`;

	const request = ajax({
		method,
		url,
		track
	});

	request.then((data) => {
			if (data) {
				const dataHtml = `<p class="content">OK. I have got data!</p>`;

				addTo(track, dataHtml);
			}
		})
		.catch((message) => {
			const errorHtml = `<p class="color_red">${message}</p>`;

			addTo(track, errorHtml);
		});




}

function addTo(track, html) {
	track.innerHTML = `${track.innerHTML}
                ${html}`;
}

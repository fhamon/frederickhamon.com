import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

const handleEvent = async (event) => {
	let options = {};
	
	try {
		options.mapRequestToAsset = (request) => {
			const url = new URL(request.url);
			url.pathname = `/`;
			return mapRequestToAsset(new Request(url, request));
		};

		return await getAssetFromKV(event, options);
	} catch (e) {
		return new Response(e.message || e.toString(), { status: 404 });
	}
};

addEventListener('fetch', event => {
	try {
		event.respondWith(handleEvent(event));
	} catch (e) {
		event.respondWith(new Response('Woops 😁', { status: 500 }));
	}
});

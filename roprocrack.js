// EVERYTHING FOR ENTERTAINMENT AND EDUCATIONAL PURPOSES ONLY. I AM NOT REPSONSIBLE FOR YOUR ACTIONS WITH THIS CODE.

async function fetchSubscription() {
	return new Promise(async (resolve) => {
		resolve("rexr"); // Change to whatever tier you would like.
	});
}

var subscriptionPromise = [];

async function getSubscription() {
	if (subscriptionPromise.length === 0) {
		subscriptionPromise.push(
			new Promise(async (resolve) => {
				const freshness = await getLocalStorage("rpSubscriptionFreshness");
				if (!freshness || Date.now() >= freshness + 300 * 1000) {
					try {
						await validateUser();
						const subscription = await fetchSubscription();
						setLocalStorage("rpSubscription", subscription);
						setLocalStorage("rpSubscriptionFreshness", Date.now());
						resolve(subscription);
					} catch (e) {
						console.log("Error fetching subscription: ", e);
						setLocalStorage("rpSubscriptionFreshness", Date.now());
						resolve(null); // Ensure the promise resolves
					}
				} else {
					resolve(await getLocalStorage("rpSubscription"));
				}
			})
		);
	}

	const myPromise = await subscriptionPromise[0];
	subscriptionPromise = []; // Reset the cache
	return myPromise;
}

getSubscription();

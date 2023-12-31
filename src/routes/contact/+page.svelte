<script>
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	let firstName, lastName, phoneNumber, subject, email, message;

	async function handleSubmit() {
		const response = await fetch('/api/send-mail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ firstName, lastName, phoneNumber, subject, email, message })
		});

		if (response.ok) {
			const successToast = {
				message: 'Email sent successfully!'
				// additional settings like timeout, autohide, etc.
			};
			toastStore.trigger(successToast);

			// Clear the input fields
			firstName = '';
			lastName = '';
			phoneNumber = '';
			subject = '';
			email = '';
			message = '';
		} else {
			const errorToast = {
				message: 'Failed to send email. Please try again.'
				// additional settings
			};
			toastStore.trigger(errorToast);
		}
	}
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact us" />
</svelte:head>
<div class="relative isolate">
	<div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
		<div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-6">
			<div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
				<h2 class="text-3xl font-bold tracking-tight text-white">Get in touch</h2>
				<p class="mt-6 text-lg leading-8 text-gray-300">
					Interested in learning more about BytePlanter, my bachelor's project at KEA? Whether
					you're a fellow student, an academic, or someone passionate about web development, I'm
					eager to engage in discussions and collaborations. Feel free to reach out to me with
					questions, suggestions, or insights related to the project. Contact me!
				</p>
				<dl class="mt-10 space-y-4 text-base leading-7 text-gray-300">
					<div class="flex gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">Address</span>
							<svg
								class="h-7 w-6 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
								/>
							</svg>
						</dt>
						<dd>KEA<br />Copenhagen</dd>
					</div>
					<div class="flex gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">Telephone</span>
							<svg
								class="h-7 w-6 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
								/>
							</svg>
						</dt>
						<dd>
							<a class="hover:text-gray-900" href="tel:+45 29809690">+45 29 80 96 90</a>
						</dd>
					</div>
					<div class="flex gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">Email</span>
							<svg
								class="h-7 w-6 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
								/>
							</svg>
						</dt>
						<dd>
							<a class="hover:text-gray-900" href="mailto:victorwpetersen@gmail.com"
								>victorwpetersen@gmail.com</a
							>
						</dd>
					</div>
				</dl>
			</div>
		</div>
		<form on:submit|preventDefault={handleSubmit} class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:pb-2">
			<div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
				<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label for="first-name" class="block text-sm font-semibold leading-6 text-gray-300"
							>First name</label
						>
						<div class="mt-2.5">
							<input
								bind:value={firstName}
								type="text"
								name="first-name"
								id="first-name"
								autocomplete="given-name"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
					<div>
						<label for="last-name" class="block text-sm font-semibold leading-6 text-gray-300"
							>Last name</label
						>
						<div class="mt-2.5">
							<input
								bind:value={lastName}
								type="text"
								name="last-name"
								id="last-name"
								autocomplete="family-name"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="subject" class="block text-sm font-semibold leading-6 text-gray-300"
							>Subject</label
						>
						<div class="mt-2.5">
							<input
								bind:value={subject}
								type="text"
								name="subject"
								id="subject"
								autocomplete="off"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="email" class="block text-sm font-semibold leading-6 text-gray-300"
							>Email</label
						>
						<div class="mt-2.5">
							<input
								bind:value={email}
								type="email"
								name="email"
								id="email"
								autocomplete="email"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="phone-number" class="block text-sm font-semibold leading-6 text-gray-300"
							>Phone number</label
						>
						<div class="mt-2.5">
							<input
								bind:value={phoneNumber}
								type="tel"
								name="phone-number"
								id="phone-number"
								autocomplete="tel"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="message" class="block text-sm font-semibold leading-6 text-gray-300"
							>Message</label
						>
						<div class="mt-2.5">
							<textarea
								bind:value={message}
								name="message"
								id="message"
								rows="4"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
				</div>
				<div class="mt-8 flex justify-end">
					<button
						type="submit"
						class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Send message</button
					>
				</div>
			</div>
		</form>
	</div>
</div>

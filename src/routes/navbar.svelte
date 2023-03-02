<script lang="ts">
	import { page } from '$app/stores';

	let currentPage: string;
	$: currentPage = $page.url.pathname;
</script>

<nav class="pt-4 pb-6">
	<div class="container max-w-md mx-auto flex justify-evenly">
		<a href="/gists" class={currentPage == '/gists' ? 'text-cyan-400' : ''}>Gists</a>
		<span class="text-white">|</span>
		<a href="/projects" class={currentPage == '/projects' ? 'text-cyan-400' : ''}>Projects</a>
		<span class="text-white">|</span>
		<a href="/" class={currentPage === '/' ? 'text-cyan-400' : ''}>Me</a>
		<span class="text-white">|</span>
		<a href="/experiences" class={currentPage === '/experiences' ? 'text-cyan-400' : ''}
			>Experiences</a
		>
	</div>
</nav>

<style>
	a {
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-family: Share Tech Mono, monospace;
		color: white;
	}

	a:hover {
		color: rgb(34 211 238);
	}
</style>

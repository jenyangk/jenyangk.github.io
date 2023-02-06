<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let currentPage = '';

	onMount(() => {
		currentPage = window.location.pathname;
	});
</script>
  
<div class="page">
	<div class="page-dotted">
		<nav class="pt-4 pb-6">
			<div class="container mx-auto flex justify-center">
				<a href="/projects" class="{currentPage === '/experiences' ? 'text-cyan-400' : ''} text-xl">Projects</a>
				<span class="text-white">|</span>
				<a href="/" class="{currentPage === '/' ? 'text-cyan-400' : ''} text-xl">Me</a>
				<span class="text-white">|</span>
				<a href="/experiences" class="{currentPage === '/experiences' ? 'text-cyan-400' : ''} text-xl">Experiences</a>
			</div>
		</nav>

		<slot />

		<footer class="container mx-auto flex flex-col items-center">
			<div>
				<a href="https://www.linkedin.com/in/jenyangkoh/"><i class="devicon-linkedin-plain" /></a>
				<a href="https://github.com/jenyangk"><i class="devicon-github-original" /></a>
			</div>
			<span class="text-xs">
				&copy; 2023 Jen Yang Koh. Built with
				<i class="devicon-svelte-plain colored" title="Svelte" style="font-size: 0.7rem" />
			</span>
		</footer>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.slate.900);
	}

	.page-dotted {
		background: radial-gradient(rgba(255, 255, 255, 0.2) 8%, transparent 8%);
		background-position: 0% 0%;
		background-size: 3vmin 3vmin;
		height: 100%;
		width: 100%;
		transition: background-position 350ms ease;
	}
</style>

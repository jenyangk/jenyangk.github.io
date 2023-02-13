<script lang="ts">
	import '../app.css';
	import Navbar from './navbar.svelte';
</script>

<div class="page">
	<div class="page-dotted">
		<Navbar />

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

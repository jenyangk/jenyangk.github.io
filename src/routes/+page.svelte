<script lang="ts">
</script>

<div class="container mx-auto flex flex-col items-center min-h-[85vh]">
	<div class="flex flex-col min-w-min max-w-lg justify-center text-center">
		<div
			class="flex flex-col rounded-md border-solid border border-white backdrop-blur-sm min-w-min shadow hover:shadow-lg hover:shadow-white hover:cursor-grab transition-shadow"
		>
			<div>
				<img class="cropped-top" src="images/profile.png" alt="Me" />
				<div class="oval-cutout" />
			</div>
			<div class="backdrop-blur-sm px-4 py-4">
				<h1 class="text-2xl">Jen Yang Koh</h1>
				<div class="w-full flex flex-col items-start">
					<div class="mb-1 flex flex-col items-start">
						<h2>Languages:</h2>
						<div class="icon-list">
							<i class="devicon-typescript-plain text-2xl px-1" title="Typescript" />
							<i class="devicon-javascript-plain text-2xl px-1" title="Javascript" />
							<i class="devicon-solidity-plain text-2xl px-1" title="Solidity" />
							<i class="devicon-csharp-plain text-2xl px-1" title="C#" />
							<i class="devicon-python-plain text-2xl px-1" title="Python" />
						</div>
					</div>
					<div class="mb-1 flex flex-col items-start">
						<h2>Libraries:</h2>
						<div class="icon-list">
							<i class="devicon-postgresql-plain text-2xl px-1" title="PostgreSQL" />
							<i class="devicon-angularjs-plain text-2xl px-1" title="Angular" />
							<i class="devicon-svelte-plain text-2xl px-1" title="Svelte" />
							<i class="devicon-tailwindcss-plain text-2xl px-1" title="Tailwind CSS" />
							<i class="devicon-d3js-plain text-2xl px-1" title="D3" />
							<i class="devicon-dotnetcore-plain text-2xl px-1" title=".NET Core" />
						</div>
					</div>
					<div class="mb-1 flex flex-col items-start">
						<h2>Platforms:</h2>
						<div class="icon-list">
							<i class="devicon-azure-plain text-2xl px-1" title="Azure" />
						</div>
					</div>
					<div class="mb-1 flex flex-col items-start">
						<h2>Interests:</h2>
						<p>Smart Contracts, Web Development, 3D</p>
					</div>
				</div>
				<div>
					<h1 class="mt-4 font-['Libre_Barcode_128'] text-5xl">https://jenyangk.github.io/</h1>
				</div>
			</div>
		</div>
	</div>
	<!-- <p class="text-justify py-4 font-['Flow_Circular  '] leading-relaxed max-w-2xl ">
		I am a full-stack developer with 2+ years of experience in frontend and backend, skilled in
		full-stack development, process automation, database design, and modern frontend technologies. I
		bring technical knowledge and collaboration to any team with positive energy and problem-solving
		skills. Enjoy hiking and traveling in my free time.
	</p> -->
</div>

<style>
	.oval-cutout {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 25px;
		border-radius: 25px;
		background-color: theme('colors.slate.800');
	}

	.cropped-top {
		margin-top: -25%;
		clip-path: polygon(0 25%, 100% 25%, 100% 100%, 0 100%);
	}
</style>

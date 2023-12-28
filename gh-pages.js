import { publish } from 'gh-pages';

publish(
	'build', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/jenyangk/jenyangk.github.io.git', // Update to point to your repository
		user: {
			name: 'Jen Yang Koh', // update to use your name
			email: 'jenyang.koh@gmail.com' // Update to use your email
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);

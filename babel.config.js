module.exports = function(api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					cwd: 'babelrc',
					alias: {
						'@application': './application',
						'@component': './application/component',
						'@config': './application/config',
						'@screens': './application/screens',
						'@utils': './application/utils',
						'@actions': './application/actions',
						'@reducers': './application/reducers'
					}
				}
			]
		]
	}
}

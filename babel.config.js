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
						'@screens': './application/screens',
						'@actions': './application/actions',
						'@reducers': './application/reducers',
						'@config': './application/config',
						'@api': './application/api',
						'@utils': './application/utils'
					}
				}
			]
		]
	}
}

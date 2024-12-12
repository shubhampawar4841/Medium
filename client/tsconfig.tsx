{
	"compilerOptions": {
		"target": "ES2020",
		"useDefineForClassFields": true,
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx",

		/* Linting and Type Checking */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true,

		/* Support for JavaScript */
		"allowJs": true,
		"checkJs": true,

		/* File Compatibility */
		"forceConsistentCasingInFileNames": true,
		"esModuleInterop": true
	},
	"include": ["src/**/*", "config.ts"],
	"exclude": ["node_modules", "dist", "*.test.ts", "*.test.tsx"],
	"references": [{ "path": "./tsconfig.node.json" }]
}

import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware to intercept personal project requests in development mode
 * and return mock data instead of querying the database
 */
export function personalProjectMiddleware(req: Request, res: Response, next: NextFunction) {
	// Log that middleware is being called
	console.log('Personal project middleware called for URL:', req.url);
	console.log('NODE_ENV:', process.env.NODE_ENV);

	// Only apply in development mode
	if (process.env.NODE_ENV !== 'development') {
		console.log('Not in development mode, skipping middleware');
		return next();
	}

	// Only intercept requests to /rest/projects/personal
	if (!req.url.includes('/rest/projects/personal')) {
		console.log('URL does not match /rest/projects/personal, skipping middleware');
		return next();
	}

	console.log('Intercepting personal project request and returning mock data');

	// Return mock personal project data
	const mockProject = {
		id: '1',
		name: "Admin's Project",
		type: 'personal',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		scopes: [
			'project:list',
			'project:read',
			'project:update',
			'project:delete',
			'credential:create',
			'credential:list',
			'credential:read',
			'credential:update',
			'credential:delete',
			'credential:share',
			'workflow:create',
			'workflow:list',
			'workflow:read',
			'workflow:update',
			'workflow:delete',
			'workflow:share',
			'workflow:execute',
			'variables:create',
			'variables:list',
			'variables:read',
			'variables:update',
			'variables:delete',
			'tags:create',
			'tags:list',
			'tags:read',
			'tags:update',
			'tags:delete',
			'external-secrets:list',
			'external-secrets:read',
			'external-secrets:use',
		],
	};

	return res.json(mockProject);
}

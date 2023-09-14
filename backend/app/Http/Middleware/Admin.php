<?php

namespace App\Http\Middleware;

use Closure;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Você precisa estar logado para acessar este recurso'], 401);
        }
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'message' => 'Você não tem permissão para acessar este recurso',
                'redirect' => '/'
            ], 10001);
        }
        return $next($request);
    }
}

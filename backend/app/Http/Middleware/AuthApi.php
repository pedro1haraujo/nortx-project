<?php

namespace App\Http\Middleware;

use App\User;
use Closure;

class AuthApi
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
        $token = $request->header('Authorization');
        $token = str_replace(['bearer ', 'Bearer '], '', $token);
        if (!$token) {
            return response()->json(['message' => 'Ops! Você precisa fazer login novamente antes de continuar...'], 401);
        }
        $user = User::query()->where('api_token', $token)->first();
        if (!$user) {
            return response()->json(['message' => 'Ops! Você precisa fazer login novamente antes de continuar...'], 401);
        }
        $request->contato = $user;
        return $next($request);
    }
}

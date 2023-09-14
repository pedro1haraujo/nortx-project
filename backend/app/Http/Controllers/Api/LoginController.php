<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');
        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Email ou senha incorretos!'], 401);
        }
        if (auth()->user()->active !== 1) {
            return response()->json(['message' => 'Parece que sua conta não foi ativada. É necessário ter sido aprovado por um administrador.'], 401);
        }
        $token = auth()->user()->api_token;
        if (!$token) {
            $token = bcrypt(Str::random(60));
            $user = auth()->user();
            $user->api_token = $token;
            $user->save();
        }
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => /* 7 dias */ 604800000,
        ]);
    }
}

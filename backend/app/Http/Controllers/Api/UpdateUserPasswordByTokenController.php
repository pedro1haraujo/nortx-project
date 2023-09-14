<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UpdateUserPasswordByTokenController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $now = now();
        $token = request()->input('token');
        $password = request()->input('password');
        $user = User::query()->where('recovery_token', $token)->where('recovery_token_expires', '>', $now)->first();
        if (!$user) {
            return response()->json(['message' => 'Ops! O link de recuperação de senha expirou ou é inválido!'], 400);
        }
        if (strlen($password) < 8) {
            return response()->json(['message' => 'A senha deve ter no mínimo 8 caracteres!'], 400);
        }
        $user->password = bcrypt($password);
        $user->recovery_token = null;
        $user->recovery_token_expires = null;
        $user->recovery_url = null;
        $user->save();
        auth()->loginUsingId($user->id);
        $token = auth()->user()->api_token;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => /* 7 dias */ 604800000,
        ]);
    }
}

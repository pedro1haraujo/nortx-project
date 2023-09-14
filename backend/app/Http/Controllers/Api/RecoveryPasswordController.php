<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\EmailRecuperacaoDeSenha;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RecoveryPasswordController extends Controller
{
    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        $email = $request->input('email');
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['message' => 'Email inválido'], 400);
        }
        if (!User::query()->where('email', $email)->exists()) {
            return response()->json(['message' => 'Email não encontrado'], 404);
        }
        $user = User::query()->where('email', $email)->first();
        if (!$user->active) {
            return response()->json([
                'message' => 'Parece que sua conta não foi ativada. É necessário ter sido aprovado por um administrador.'
            ], 400);
        }
        $user->recovery_token = Str::random(12);
        $user->recovery_token_expires = now()->addHour();
        $url = strpos(config('app.url'), 'localhost') !== false? 'http://localhost:5173/recovery': 'https://comandoquestoes.com/recovery';
        $user->recovery_url = rtrim($url, '/') . '/' . $user->recovery_token;
        $user->save();
        //Mail::to($email)->send(new EmailRecuperacaoDeSenha($user->name, $user->email, $user->recovery_url));
        return response()->json([
            'message' => 'Ótimo! Enviamos um email para você recuperar sua senha.'
        ]);
    }
}

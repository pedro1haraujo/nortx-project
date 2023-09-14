<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $payload = $request->only(['name', 'email', 'password']);
        if (!isset($payload['name'], $payload['email'])) {
            return response()->json([
                'message' => 'Os campos nome e email são obrigatórios',
            ], 400);
        }
        // check some value is empty
        if (empty($payload['name']) || empty($payload['email'])) {
            return response()->json([
                'message' => 'Os campos nome e email são obrigatórios',
            ], 400);
        }
        // check email is valid
        if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
            return response()->json([
                'message' => 'O email informado não é válido',
            ], 400);
        }
        // check if the user already exists
        if (User::query()->where('email', $payload['email'])->exists()) {
            return response()->json([
                'message' => 'O email já existe no sistema',
            ], 400);
        }
        // create the user
        $user = User::query()->create([
            'name' => $payload['name'],
            'email' => $payload['email'],
            'password' => $payload['password']? Hash::make($payload['password']): null,
            'active' => 0,
            'user_role_id' => 2,
        ]);
        $token = bcrypt(Str::random(60));
        $user->api_token = $token;
        $user->save();
        return response()->json([
            'message' => 'Cadastro realizado! Aguarde a aprovação do administrador pelo seu email.',
        ]);
    }
}

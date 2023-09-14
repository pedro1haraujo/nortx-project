<?php

namespace App;

use App\Models\Notificacao;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'image', 'password',
        'recovery_token', 'recovery_token_expires', 'active',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getImageAttribute($value): string
    {
        $default = $value ?: 'avatar.png';
        return asset("/images/users/$default");
    }

    public function notificacoes()
    {
        return $this->hasMany(Notificacao::class);
    }

    public function notificacoesNaoLidas(int $limit = 3)
    {
        return $this->notificacoes()->naoLidas()->select(['id', 'titulo', 'lida', 'url', 'created_at'])->take($limit);
    }

}

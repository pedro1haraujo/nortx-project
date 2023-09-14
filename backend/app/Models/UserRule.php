<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRule extends Model
{
    protected $table = 'users_rule';
    protected $fillable = ['name', 'description', 'slug'];

    public function getCreatedAtAttribute($value)
    {
        return $value? date('Y-m-d H:i:s', strtotime($value)): null;
    }

    public function getUpdatedAtAttribute($value)
    {
        return $value? date('Y-m-d H:i:s', strtotime($value)): null;
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function scopeAdmin($query)
    {
        return $query->where('slug', 'admin');
    }

    public function scopeUser($query)
    {
        return $query->where('slug', 'user');
    }
}

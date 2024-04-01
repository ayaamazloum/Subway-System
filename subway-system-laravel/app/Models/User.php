<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    public function passenger()
    {
        return $this->belongsTo(Passenger::class);
    }

    protected $fillable = ['name', 'email', 'password', 'role_id'];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($user) {
            $user->passenger()->create([
                'user_id' => $user->id,
                'latitude' => request()->input('latitude'),
                'longitude' => request()->input('longitude'),
                'wallet_balance' => request()->input('wallet_balance'),
            ]);
        });
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}

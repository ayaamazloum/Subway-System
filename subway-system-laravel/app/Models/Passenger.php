<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'latitude', 'longitude', 'wallet_balance'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

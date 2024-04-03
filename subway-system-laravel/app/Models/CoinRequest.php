<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoinRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'amount',
        'passenger_id'
    ];
    public function passenger(){
        return $this->belongsTo(Passenger::class);
    }
}

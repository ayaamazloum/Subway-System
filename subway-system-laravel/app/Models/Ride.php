<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function startStation()
    {
        return $this->belongsTo(Station::class, 'start_station_id');
    }

    public function endStation()
    {
        return $this->belongsTo(Station::class, 'end_station_id');
    }
}

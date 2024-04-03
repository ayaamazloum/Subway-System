<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    protected $fillable = ['latitude', 'longitude'];

    
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function rides()
    {
        return $this->hasMany(Ride::class);
    }
}

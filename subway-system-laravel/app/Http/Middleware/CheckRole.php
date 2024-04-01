<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Role;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, $roleName)
    {
        $role = Role::where('name', $roleName)->first();

        if (!$role) {
            return response()->json(['error' => 'Role not found'], 404);
        }

        
        if ($request->user() && $request->user()->role_id != $role->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}

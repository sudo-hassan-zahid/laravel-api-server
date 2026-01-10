<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class CommentController extends Controller
{
    #[OA\Get(
        path: '/api/posts/{postId}/comments',
        operationId: 'getComments',
        tags: ['Comments'],
        summary: 'Get comments for a post',
        description: 'Returns list of comments for a specific post',
        parameters: [
            new OA\Parameter(
                name: 'postId',
                description: 'Post ID',
                required: true,
                in: 'path',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation'),
            new OA\Response(response: 404, description: 'Post not found')
        ]
    )]
    public function index($postId)
    {
        $post = Post::findOrFail($postId);
        return response()->json($post->comments()->with('user')->get(), 200);
    }

    #[OA\Post(
        path: '/api/posts/{postId}/comments',
        operationId: 'storeComment',
        tags: ['Comments'],
        summary: 'Add a comment to a post',
        description: 'Creates a new comment for the specified post',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'postId',
                description: 'Post ID',
                required: true,
                in: 'path',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['content'],
                properties: [
                    new OA\Property(property: 'content', type: 'string', example: 'This is a comment')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Comment created successfully'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Post not found')
        ]
    )]
    public function store(Request $request, $postId)
    {
        $request->validate(['content' => 'required|string']);

        $post = Post::findOrFail($postId);
        
        $comment = $post->comments()->create([
            'content' => $request->content,
            'user_id' => $request->user()->id
        ]);

        return response()->json($comment->load('user'), 201);
    }
}

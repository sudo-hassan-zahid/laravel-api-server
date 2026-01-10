<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use OpenApi\Attributes as OA;

class PostController extends Controller
{
    #[OA\Get(
        path: '/api/posts',
        operationId: 'getPostsList',
        tags: ['Posts'],
        summary: 'Get list of posts',
        description: 'Returns list of posts',
        responses: [
            new OA\Response(response: 200, description: 'Successful operation'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 403, description: 'Forbidden')
        ]
    )]
    public function index()
    {
     return response()->json(Post::all(),200);
    }

    #[OA\Post(
        path: '/api/posts',
        operationId: 'storePost',
        tags: ['Posts'],
        summary: 'Store new post',
        description: 'Returns post data',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['title', 'content'],
                properties: [
                    new OA\Property(property: 'title', type: 'string', example: 'My Post Title'),
                    new OA\Property(property: 'content', type: 'string', example: 'This is the content of the post')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Successful operation'),
            new OA\Response(response: 400, description: 'Bad Request'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 403, description: 'Forbidden')
        ]
    )]
    public function store(Request $request)
    {
       $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    #[OA\Get(
        path: '/api/posts/{id}',
        operationId: 'getPostById',
        tags: ['Posts'],
        summary: 'Get post information',
        description: 'Returns post data',
        parameters: [
            new OA\Parameter(
                name: 'id',
                description: 'Post id',
                required: true,
                in: 'path',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation'),
            new OA\Response(response: 400, description: 'Bad Request'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 403, description: 'Forbidden'),
            new OA\Response(response: 404, description: 'Resource Not Found')
        ]
    )]
    public function show($id){
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        return response()->json($post, 200);
    }

    #[OA\Put(
        path: '/api/posts/{id}',
        operationId: 'updatePost',
        tags: ['Posts'],
        summary: 'Update existing post',
        description: 'Returns updated post data',
        parameters: [
            new OA\Parameter(
                name: 'id',
                description: 'Post id',
                required: true,
                in: 'path',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['title', 'content'],
                properties: [
                    new OA\Property(property: 'title', type: 'string', example: 'My Post Title'),
                    new OA\Property(property: 'content', type: 'string', example: 'This is the content of the post')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Successful operation'),
            new OA\Response(response: 400, description: 'Bad Request'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 403, description: 'Forbidden'),
            new OA\Response(response: 404, description: 'Resource Not Found')
        ]
    )]
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $validated = $request->validate([
            'title'   => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $post->update($validated);

        return response()->json($post, 200);
    }

    #[OA\Delete(
        path: '/api/posts/{id}',
        operationId: 'deletePost',
        tags: ['Posts'],
        summary: 'Delete existing post',
        description: 'Deletes a record and returns no content',
        parameters: [
            new OA\Parameter(
                name: 'id',
                description: 'Post id',
                required: true,
                in: 'path',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Successful operation', content: new OA\JsonContent()),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 403, description: 'Forbidden'),
            new OA\Response(response: 404, description: 'Resource Not Found')
        ]
    )]
    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted'], 200);
    }
}

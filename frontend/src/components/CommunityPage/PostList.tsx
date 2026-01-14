import { Post } from './types';
import { PostCard } from './PostCard';

interface PostListProps {
    posts: Post[];
    onVote: (pollId: string, optionId: string) => void;
    onAddComment: (postId: string, content: string) => void;
    onTranslate: (postId: string) => void;
}

export function PostList({ posts, onVote, onAddComment, onTranslate }: PostListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No posts found in this category.
            </div>
        );
    }

    return (
        <div className="space-y-4 px-4 pb-20">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    onVote={onVote}
                    onAddComment={onAddComment}
                    onTranslate={onTranslate}
                />
            ))}
        </div>
    );
}

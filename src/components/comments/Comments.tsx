import { FC, useState } from 'react'
import { CommentType, CreateCommentFields } from 'models/comment'

import { Button, Form, FormLabel } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import authStore from 'stores/auth.store'
import { addComment } from 'api/Comment'
import { useCommentForm } from 'hooks/react-hook-form/useCreateComment'

interface CommentsProps {
  artworkId: string
  comments: CommentType[]
  setComments: (comments: CommentType[]) => void
}

const Comments: FC<CommentsProps> = ({ artworkId, comments, setComments }) => {
  const { handleSubmit, control, reset, errors } = useCommentForm()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = handleSubmit(async (data: CreateCommentFields) => {
    if (!authStore.user) {
      setError('You must be logged in to comment.')
      return
    }

    try {
      const newComment = await addComment({
        ...data,
        user_id: authStore.user.id,
        artwork_id: artworkId,
      })
      setComments([...comments, newComment.data])
      reset()
    } catch (err) {
      console.error('Error adding comment:', err)
      setError('Failed to add comment. Please try again.')
    }
  })

  return (
    <div className="comments-section mt-4">
      <h3>Comments</h3>
      <ul className="list-unstyled">
        {comments.map((comment) => (
          <li key={comment.id} className="mb-3">
            <strong>{comment.user.first_name}</strong>: {comment.comment_text}
          </li>
        ))}
      </ul>

      {authStore.user && (
        <Form onSubmit={onSubmit} className="mt-4">
          <Form.Group className="mb-3">
            <FormLabel htmlFor="comment_text">Leave a comment</FormLabel>
            <Controller
              name="comment_text"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="comment_text"
                  rows={3}
                  className={`form-control ${
                    errors.comment_text ? 'is-invalid' : ''
                  }`}
                  placeholder="Write your comment..."
                />
              )}
            />
            {errors.comment_text && (
              <div className="invalid-feedback">
                {errors.comment_text.message}
              </div>
            )}
          </Form.Group>
          <Button type="submit" className="btn btn-primary">
            Submit Comment
          </Button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Form>
      )}
    </div>
  )
}

export default Comments

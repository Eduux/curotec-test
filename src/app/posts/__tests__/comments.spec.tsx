import { render, screen, fireEvent } from "@testing-library/react";
import { vi, Mock } from "vitest";
import Comments from "../components/comments";
import { usePostInteractionStore } from "../../stores/posts";
import { Comment } from "@/domain/posts/types";

// Mock do store
vi.mock("../../stores/posts", () => ({
  usePostInteractionStore: vi.fn(),
}));

describe("Comments Component", () => {
  const mockAddComment = vi.fn();
  const mockDeleteComment = vi.fn();
  const mockGetCommentsByPostId = vi.fn(() => []) as Mock<() => Comment[]>;

  beforeEach(() => {
    vi.clearAllMocks();

    (usePostInteractionStore as unknown as Mock).mockReturnValue({
      addComment: mockAddComment,
      deleteComment: mockDeleteComment,
      getCommentsByPostId: mockGetCommentsByPostId,
    });
  });

  const mockComments: Comment[] = [
    {
      author: "John Doe",
      content: "This is a test comment.",
      created_at: "2025-02-06T12:30:00Z",
    },
    {
      author: "Jane Smith",
      content: "Another insightful comment!",
      created_at: "2025-02-06T14:10:00Z",
    },
  ];

  it("should render the list of comments", () => {
    render(<Comments postId="1" comments={mockComments} />);

    expect(screen.getByText("Comments")).toBeTruthy();
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("This is a test comment.")).toBeTruthy();
    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.getByText("Another insightful comment!")).toBeTruthy();
  });

  it("should display 'No comments yet' when no comments are available", () => {
    render(<Comments postId="1" comments={[]} />);

    expect(screen.getByText("No comments yet. Be the first!")).toBeTruthy();
  });

  it("should add a new comment when clicking the add button", () => {
    render(<Comments postId="1" comments={[]} />);

    const input = screen.getByPlaceholderText("Write a comment...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New test comment" } });
    fireEvent.click(addButton);

    expect(mockAddComment).toHaveBeenCalledWith("1", {
      author: "User",
      content: "New test comment",
      created_at: expect.any(String),
    });
  });

  it("should not add an empty comment", () => {
    render(<Comments postId="1" comments={[]} />);

    const addButton = screen.getByText("Add");

    fireEvent.click(addButton);

    expect(mockAddComment).not.toHaveBeenCalled();
  });

  it("should delete a comment when clicking the delete button", () => {
    const myComment = {
      author: "User",
      content: "This is my comment.",
      created_at: "2025-02-06T15:00:00Z",
    };

    mockGetCommentsByPostId.mockReturnValue([myComment]);

    render(<Comments postId="1" comments={[]} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockDeleteComment).toHaveBeenCalledWith("1", "2025-02-06T15:00:00Z");
  });
});

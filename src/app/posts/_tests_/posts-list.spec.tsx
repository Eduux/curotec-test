import { render, screen, fireEvent } from "@testing-library/react";
import { vi, Mock } from "vitest";
import PostsList from "../components/posts-list";
import { usePostInteractionStore } from "../../../stores/posts";
import { Post } from "../../../domain/posts/types";

const mockData: Post[] = [
  {
    id: "1",
    title: "Exploring Vue 3",
    description: "Sharing my experience migrating a project to Vue 3.",
    created_at: "2025-02-06T10:15:30Z",
    author: "Eduardo Quadros",
    likes: 32,
    tags: ["Vue 3", "JavaScript", "Front-end"],
    comments: [
      {
        author: "John Smith",
        content:
          "Great insights! I recently migrated to Vue 3 and faced some issues with the Composition API. Any tips?",
        created_at: "2025-02-06T12:30:00Z",
      },
      {
        author: "Alice Johnson",
        content:
          "Awesome article! Vue 3 has been a game-changer for my projects.",
        created_at: "2025-02-06T14:10:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Exploring Vue 2",
    description: "Sharing my experience migrating a project to Vue 3.",
    created_at: "2025-02-06T10:15:30Z",
    author: "Eduardo Quadros",
    likes: 32,
    tags: ["Vue 3", "JavaScript", "Front-end"],
    comments: [
      {
        author: "John Smith",
        content:
          "Great insights! I recently migrated to Vue 3 and faced some issues with the Composition API. Any tips?",
        created_at: "2025-02-06T12:30:00Z",
      },
      {
        author: "Alice Johnson",
        content:
          "Awesome article! Vue 3 has been a game-changer for my projects.",
        created_at: "2025-02-06T14:10:00Z",
      },
    ],
  },
];

vi.mock("../../../stores/posts", () => ({
  usePostInteractionStore: vi.fn(),
}));

describe("PostsList Component", () => {
  const mockLikeOrUnlike = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (usePostInteractionStore as unknown as Mock).mockReturnValue({
      isPostLiked: vi.fn((id) => id === "1"),
      likeOrUnlike: mockLikeOrUnlike,
    });
  });

  it("should render the list of posts", () => {
    const mockPosts = mockData;

    render(<PostsList posts={mockPosts} />);

    expect(screen.getByText(mockPosts[0].title)).toBeTruthy();
    expect(screen.getByText(mockPosts[1].title)).toBeTruthy();
  });

  it("should display 'Not Found' when no posts are available", () => {
    render(<PostsList posts={[]} />);

    expect(screen.getByTestId("not-found")).toBeDefined();
  });

  it("should call likeOrUnlike when clicking the like button", () => {
    const mockPosts = [mockData[0]];

    render(<PostsList posts={mockPosts} />);

    const likeButton = screen.getByTestId("like-button-1");
    fireEvent.click(likeButton);

    expect(mockLikeOrUnlike).toHaveBeenCalledWith("1");
  });
});

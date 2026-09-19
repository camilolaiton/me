import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Projects from './Projects';
import projectsData from '../../public/projects.json';

const MASTER_THESIS = /3D Brain MRI Segmentation with Self-Attention/i;

const findCard = (cards, pattern) =>
  cards.find((card) => pattern.test(card.textContent));

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(projectsData) })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('cards are reachable and openable by keyboard', async () => {
  const { container } = render(<Projects />);

  const cards = await screen.findAllByRole('button', { name: /view details for/i });
  expect(cards.length).toBeGreaterThan(0);
  cards.forEach((card) => expect(card).toHaveAttribute('tabindex', '0'));

  fireEvent.keyDown(findCard(cards, MASTER_THESIS), { key: 'Enter' });

  await waitFor(() =>
    expect(container.querySelector('[role="dialog"]')).toBeInTheDocument()
  );
});

test('video slides render as <video> with a poster and are not preloaded', async () => {
  const { container } = render(<Projects />);

  const cards = await screen.findAllByRole('button', { name: /view details for/i });
  const card = findCard(cards, MASTER_THESIS);

  // The grid must never point an <img> at a video file.
  expect(card.querySelector('img').getAttribute('src')).not.toMatch(/\.mp4$/);

  fireEvent.click(card);
  await waitFor(() =>
    expect(container.querySelector('[role="dialog"]')).toBeInTheDocument()
  );

  const videos = container.querySelectorAll('video');
  expect(videos).toHaveLength(3);
  videos.forEach((video) => {
    expect(video.getAttribute('src')).toMatch(/\.mp4$/);
    expect(video.getAttribute('poster')).toMatch(/-poster\.jpg$/);
    // Without this the modal would pull ~10 MB of clips on open.
    expect(video.getAttribute('preload')).toBe('none');
  });
});

test('Escape closes the modal', async () => {
  const { container } = render(<Projects />);

  const cards = await screen.findAllByRole('button', { name: /view details for/i });
  fireEvent.click(findCard(cards, MASTER_THESIS));
  await waitFor(() =>
    expect(container.querySelector('[role="dialog"]')).toBeInTheDocument()
  );

  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() =>
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument()
  );
});

test('a failed fetch shows a message instead of hanging on "Loading…"', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch.mockImplementation(() => Promise.reject(new Error('network down')));

  render(<Projects />);

  expect(await screen.findByText(/could not be loaded/i)).toBeInTheDocument();
  expect(screen.queryByText(/loading projects/i)).not.toBeInTheDocument();
});

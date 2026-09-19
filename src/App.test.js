import { render, screen } from '@testing-library/react';
import App from './App';

const profile = {
  name: 'Camilo Laiton',
  titles: ['Machine Learning Engineer'],
  metrics: [],
  social: [],
  research: [],
  projects: [],
  honors: [],
  certificates: [],
  speakLanguages: [],
};

beforeEach(() => {
  // App, Projects, BlogPosts and GitHubActivity each fetch on mount; only the
  // profile payload is asserted against here.
  jest.spyOn(global, 'fetch').mockImplementation((url) =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(
          String(url).includes('personal_information') ? profile : {}
        ),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the profile once data has loaded', async () => {
  render(<App />);

  // findAllBy* retries until the fetch resolves and the app swaps out "Loading…".
  const names = await screen.findAllByText(/camilo laiton/i);
  expect(names.length).toBeGreaterThan(0);

  expect(screen.queryByText(/loading…/i)).not.toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import Publications from './Publications';
import profile from '../../public/personal_information.json';

const publications = profile.research.flatMap((r) => r.pubs || []);
const isPublished = (pub) => !/in review|under review|pending|prepar|accepted in principle/i.test(pub.state || '');

test('headline counts every published paper, including ones with no link', () => {
  const published = publications.filter(isPublished);
  const unlinked = published.filter((pub) => !pub.url || pub.url === '#');

  // Guard the regression: this only bites when a published paper has no URL.
  expect(published).toHaveLength(9);
  expect(unlinked.length).toBeGreaterThan(0);

  render(<Publications researchInfo={profile.research} />);

  expect(screen.getByText('Nine')).toBeInTheDocument();
  expect(screen.queryByText('Eight')).not.toBeInTheDocument();
});

test('headline agrees with the number of Published tags in the list', () => {
  render(<Publications researchInfo={profile.research} />);

  const publishedTags = screen.getAllByText('Published');
  expect(publishedTags).toHaveLength(publications.filter(isPublished).length);
});

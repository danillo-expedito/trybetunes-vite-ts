function MusicCard(
  { trackName, previewUrl }: { trackName: string, previewUrl: string },
): JSX.Element {
  return (
    <div>
      <h3>{trackName}</h3>
      <audio controls data-testid="audio-component">
        <source src={ previewUrl } type="audio/mpeg" />
        <track kind="captions" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default MusicCard;

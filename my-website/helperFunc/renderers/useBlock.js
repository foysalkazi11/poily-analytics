const handleBlockData = (block) => {
  const { id, tunes } = block;
  if (block) {
    const anchor = tunes?.anchorTune?.anchor;
    const anchorId = anchor ? anchor : id;

    return anchorId;
  }
};

export default handleBlockData;

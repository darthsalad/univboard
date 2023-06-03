import React from 'react'

type CardModalProps = {
  title: string;
  text: string;
  labels: string[];
  owner: string;
  collaborators: string[];
  id: string;
  pinned: boolean;
  createdOn: string;
  modifiedOn: string;
};

const CardModal = ({
  title,
  text,
  labels,
  owner,
  collaborators,
  id,
  pinned,
  createdOn,
  modifiedOn,
}: CardModalProps) => {
  return (
    <div>CardModal</div>
  )
}

export default CardModal
<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Article Entity
 *
 * @ApiResource
 * @ApiFilter(SearchFilter::class, properties={"tags": "exact", "content": "partial"})
 * @ORM\Entity
 * @ORM\Table(name="articles")
 */
class Article
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="string")
     */
    private $reference;

    /**
     * @ORM\Column(type="text")
     */
    private $content;

    /**
     * @ORM\Column(type="boolean")
     */
    private $draft;

    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity="Tag", inversedBy="articles")
     * @ORM\JoinTable(name="articles_tags")
     */
    public $tags;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="articles")
     */
    public $user;

    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="article", cascade={"persist"})
     */
    public $comments;

    /**
     * @ORM\OneToMany(targetEntity="Reaction", mappedBy="article", cascade={"persist"})
     */
    public $reactions;

    public function __construct() {
        $this->tags = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->reactions = new ArrayCollection();
    }

    public function setId($_id) {
        $this->id = $_id;
    }

    public function getId() {
        return $this->id;
    }

    public function setName($_name) {
        $this->name = $_name;
    }

    public function getName() {
        return $this->name;
    }

    public function setReference($_reference) {
        $this->reference = $_reference;
    }

    public function getReference() {
        return $this->reference;
    }

    public function setContent($_content) {
        $this->content = $_content;
    }

    public function getContent() {
        return $this->content;
    }

    public function setDraft($_draft) {
        $this->draft = $_draft;
    }

    public function getDraft() {
        return $this->draft;
    }

    public function setCreatedAt($_createdAt) {
        $this->createdAt = $_createdAt;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function setUpdatedAt($_updatedAt) {
        $this->updatedAt = $_updatedAt;
    }

    public function getUpdatedAt() {
        return $this->updatedAt;
    }

    public function addComment(Comment $_comment) {
        $this->comments->add($_comment);
        $_comment->article = $this;
    }

    public function removeComment(Comment $_comment) {
        $this->comments->removeElement($_comment);
        $_comment->article = null;
    }

    public function addReaction(Reaction $_reaction) {
        $this->reactions->add($_reaction);
        $_reaction->article = $this;
    }

    public function removeReaction(Reaction $_reaction) {
        $this->reactions->removeElement($_reaction);
        $_reaction->article = null;
    }
}

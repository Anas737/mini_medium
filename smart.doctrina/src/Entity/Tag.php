<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Tag Entity
 *
 * @ApiResource
 * @ORM\Entity
 * @ORM\Table(name="tags")
 */
class Tag
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
    private $title;

    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity="Article", mappedBy="tags", cascade={"persist"})
     */
    public $articles;

    public function __construct() {
        $this->articles = new ArrayCollection();
    }

    public function setId($_id) {
        $this->id = $_id;
    }

    public function getId() {
        return $this->id;
    }

    public function setTitle($_title) {
        $this->title = $_title;
    }

    public function getTitle() {
        return $this->title;
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

    public function addArticle(Article $_article) {
        $this->articles->add($_article);
        $_article->tags->add($this);
    }

    public function removeArticle(Article $_article) {
        $this->articles->removeElement($_article);
        $_article->tags->removeElement($this);
    }
}

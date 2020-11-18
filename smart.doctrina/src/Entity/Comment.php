<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Comment Entity
 *
 * @ApiResource
 * @ORM\Entity
 * @ORM\Table(name="comments")
 */
class Comment
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
    private $content;

    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="Article", inversedBy="comments")
     */
    public $article;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="comments")
     */
    public $user;

    public function setId($_id) {
        $this->id = $_id;
    }

    public function getId() {
        return $this->id;
    }

    public function setContent($_content) {
        $this->content = $_content;
    }

    public function getContent() {
        return $this->content;
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
}

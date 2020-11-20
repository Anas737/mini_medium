<?php

namespace App\Entity;

use \Datetime;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;


/**
 * User Entity
 *
 * @ApiResource
 * @ApiFilter(SearchFilter::class, properties={"email": "exact", "username":"exact"})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="users")
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", unique=true)
     */
    private $username;

    /**
     * @ORM\Column(type="string", unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string")
     */
    private $role;

    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at")
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="Article", mappedBy="user", cascade={"persist"})
     */
    public $articles;

    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="user", cascade={"persist"})
     */
    public $comments;

    /**
     * @ORM\OneToMany(targetEntity="Reaction", mappedBy="user", cascade={"persist"})
     */
    public $reactions;



    public function __construct() {
        $this->articles = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->reactions = new ArrayCollection();
    }

    public function setId($_id) {
        $this->id = $_id;
    }

    public function getId() {
        return $this->id;
    }

    public function setUsername($_username) {
        $this->username = $_username;
    }

    public function getUsername() {
        return $this->username;
    }

    public function setEmail($_email) {
        $this->email = $_email;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setPassword($_password) {
        $this->password = $_password;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setRole($_role) {
        $this->role = $_role;
    }

    public function getRole() {
        return $this->role;
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
        $_article->user = $this;
    }

    public function removeArticle(Article $_article) {
        $this->articles->removeElement($_article);
        $_article->user = null;
    }

    public function addComment(Comment $_comment) {
        $this->comments->add($_comment);
        $_comment->user = $this;
    }

    public function removeComment(Comment $_comment) {
        $this->comments->removeElement($_comment);
        $_comment->user = null;
    }

    /**
    * @ORM\PrePersist
    * @ORM\PreUpdate
    */
    public function updatedTimestamps(): void
    {
        $this->setUpdatedAt(new DateTime('now'));
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt(new DateTime('now'));
        }
    }
}
